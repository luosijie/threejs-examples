
export enum EmitterType {
    Tick = 'Tick'
}

class Emitter {
    events: {[key:string]: Array<Function>}

    constructor () {
        this.events = {}
    }

    on (type: EmitterType, event: Function) {
        if (!type) {
            console.warn('EmitterType is required')
            return
        }
        if (!this.events[type]) this.events[type] = []
        this.events[type].push(event)
    }

    emit (type: EmitterType, data: any) {
        const emitEvents = this.events[type]
        if (!emitEvents) {
            console.warn('No event registed')
            return
        }

        for (let i = 0; i < emitEvents.length; i++) {
            const fn = emitEvents[i]
            fn(data)
        }
    }
}

export default new Emitter()