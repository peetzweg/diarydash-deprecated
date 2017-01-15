import {EventEmitter} from "events";
import moment from "moment";

class DBActions extends EventEmitter {
	constructor() {
		super();

		this.save = this.save.bind(this);
		this.restoreTodaysEntry = this.restoreTodaysEntry.bind(this);
		this.getTodaysEntry = this.getTodaysEntry.bind(this);

		this.db = null;
		this.todaysEntry = null;

		const openRequest = indexedDB.open("diarydash", 1);
		openRequest.onupgradeneeded = e => {
			console.log("Upgrade needed...");
			this.db = e.target.result;

			if (!this.db.objectStoreNames.contains("entry")) {
				console.log("Creating "entry" object store...");
				this.db.createObjectStore("entry", {keyPath: "date"});
			}
		};

		openRequest.onsuccess = e => {
			console.log("Database successfully arranged");
			this.db = e.target.result;

			this.transferLocalStorageToIndexDB();
			this.emit("ready");
		};

		openRequest.onerror = e => {
			console.log("Error while setting up the database");
			console.dir(e);
		};
	}

	transferLocalStorageToIndexDB() {
		console.log("Importing old LocalStorage entries");
		let entries = [];
		for (let n = 0; n < localStorage.length; n++) {
			const key = localStorage.key(n);
			if (key.startsWith("dd_")) {
				if (localStorage[key].replace("\n", "").trim().length > 0) {
					entries.push({
						date: moment(key.replace("dd_", "")).startOf("day").toISOString(),
						text: localStorage[key]
					})
				}
			}
		}
		this.putEntries(entries)
	}

	putEntries(entries) {
		const entryStore = this.db.transaction("entry", "readwrite").objectStore("entry");

		let i = 0;
		putNext();

		function putNext() {
			if (i < entries.length) {
				console.log("inserting", entries[i]);
				entryStore.put(entries[i]).onsuccess = putNext;
				++i;
			} else {   // complete
				console.log("Successfully ported LocalStorage entries");
				// callback();
			}
		}
	}

	save(editorState) {
		const dateKey = moment().startOf("day").toISOString();
		const entry = {
			date: dateKey,
			text: editorState.getCurrentContent().getPlainText(),
		};

		this.saveOrUpdateEntry(entry)
	}


	saveOrUpdateEntry(entry) {
		console.log("trying to store:", entry);
		const entryStore = this.db.transaction("entry", "readwrite").objectStore("entry");

		const requestGet = entryStore.get(entry.date);
		requestGet.onsuccess = ()=> {
			const requestPut = entryStore.put(entry);
			requestPut.onsuccess = ()=> {
				console.log("updated", entry);
				this.emit("saved")
			};
			requestPut.onError = ()=> {
				console.log("Error while updating:", entry);
			};
		};
		requestGet.onerror = ()=> {
			const requestAdd = entryStore.add(entry);
			requestAdd.onsuccess = ()=> {
				console.log("stored", entry);
				this.emit("saved")
			};
			requestAdd.onerror = ()=> {
				console.log("Error while storing:", entry);
			};
		};
	}

	restoreTodaysEntry() {
		const entryStore = this.db.transaction("entry").objectStore("entry");
		const request = entryStore.get(moment().startOf("day").toISOString());
		request.onsuccess = event => {
			console.log("event", event);
			this.todaysEntry = request.result;
			this.emit("restored")
		};
		request.onerror = event => {
			console.log("event", event);
			this.emit("error")
		}
	}

	getTodaysEntry() {
		return this.todaysEntry;
	}
}

export default new DBActions();
