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

		const openRequest = indexedDB.open("diarydash", 2);
		openRequest.onupgradeneeded = e => {
			console.log("running onupgradeneeded");
			this.db = e.target.result;

			if (!this.db.objectStoreNames.contains("entry")) {
				this.db.createObjectStore("entry", {keyPath: "date"});
			}

		};

		openRequest.onsuccess = e => {
			console.log("Success!");
			this.db = e.target.result;
			this.emit("ready");
		};

		openRequest.onerror = e => {
			console.log("Error");
			console.dir(e);
		};
	}


	save(editorState) {
		const dateKey = moment().startOf("day").toISOString();
		const entry = {
			text: editorState.getCurrentContent().getPlainText(),
			date: dateKey,
		};
		const entryStore = this.db.transaction("entry", "readwrite").objectStore("entry");

		const requestGet = entryStore.get(dateKey);
		requestGet.onsuccess = ()=> {
			const requestPut = entryStore.put(entry);
			requestPut.onsuccess = ()=> {
				console.log("UPDATED");
				this.emit("saved")
			};
			requestPut.onError = ()=> {
				console.log("Error while updating...");
			};
		};
		requestGet.onerror = ()=> {
			const requestAdd = entryStore.add(entry);
			requestAdd.onsuccess = ()=> {
				console.log("SAVED");
				this.emit("saved")
			};
			requestAdd.onerror = ()=> {
				console.log("Error white Saving...");
			};
		}


	}

	restoreTodaysEntry() {
		const entryStore = this.db.transaction("entry").objectStore("entry");
		const request = entryStore.get(moment().startOf("day").toISOString());
		request.onsuccess = event => {
			console.log('event', event);
			this.todaysEntry = request.result;
			this.emit("restored")
		};
		request.onerror = event => {
			console.log('event', event);
			this.emit("error")
		}
	}

	getTodaysEntry() {
		return this.todaysEntry;
	}
}

export default new DBActions();
