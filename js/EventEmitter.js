export class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * 
     * @param {string} name EventName
     * @param {*} cb Function to be called
     */
    on(name, cb) {
        const callbacks = this.listeners.get(name) ?? [];
        callbacks.push(cb);
        this.listeners.set(name, callbacks);
    }

    /**
     * 
     * @param {string} name EventName
     * @param  {...any} args 
     */
    emit(name, ...args) {
        const callbacks = this.listeners.get(name);
        if (callbacks) {
            callbacks.forEach(cb => cb.apply(null, args));
        }
    }
}