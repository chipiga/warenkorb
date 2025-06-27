'use strict';

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (typeof listener !== 'function') {
            console.error(`EventEmitter: Listener for event "${eventName}" is not a function.`);
            return;
        }
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    off(eventName, listenerToRemove) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter(
            (listener) => listener !== listenerToRemove
        );
    }

    emit(eventName, data) {
        if (!this.events[eventName]) {
            return;
        }
        // Call listeners in a try-catch block to prevent one failing listener
        // from stopping others.
        this.events[eventName].forEach((listener) => {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in event listener for ${eventName}:`, error);
            }
        });
    }
}

// Export a single instance to be used as a global event bus
const eventEmitter = new EventEmitter();
export default eventEmitter;
