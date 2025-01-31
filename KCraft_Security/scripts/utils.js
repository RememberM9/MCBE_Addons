import * as mc from '@minecraft/server';

export const clickTest = (data) => {
    const dateStamp = Date.now();
    const stamp = data[Symbol.for('dateStamp')];
    data[Symbol.for('dateStamp')] = dateStamp;
    return dateStamp - (stamp ?? dateStamp)
};

export const random = (a = 1, b = 0, c = true) => {
    ({ a, b } = (a > b ? { a, b } : { b, a })), a = Math.random() * (a - b) + b;
    return c ? Math.round(a) : a;
};

export const initialsOf = (() => {
    const invalid = /\"|\\/, space = /\s+/g, post = /\s+|§./g;
    return (str = '') => {
        let result = '';
        if (invalid.test(str) || str.length > 30 ||
            (str = str?.replace?.(post, ' ').trim() ?? '')
                .split(space).join('').length < 4
        ) throw new Error('Create a different Name!');
        if ((result = str.split(space).reduce((res, s) => res + s[0], '')).length <= 1)
            result += str.replace(space, '')[1];
        return result.substring(0, 3).toUpperCase();
    }
})();


export function getFirstMention(message = '@') {
    return (message = message?.split('@')[1]) ? message.startsWith('"') ? message.split('"')[1] : message.includes(' ') ? message.split(' ')[0] : message : "";
};

/**
 * @param {import("@minecraft/server").Vector3} location 
 * @param {import("@minecraft/server").Dimension} dim
 * @returns {Promise<import("@minecraft/server").Block>}
 */
export function getBlock(location, dim = mc.world.getDimension("overworld")) {
    let block, { x, y, z } = location;
    const getBlock = dim.getBlock.bind(dim, location);
    try { if (!(block = getBlock())) throw null; else return block }
    catch {
        dim.runCommand(`tickingarea add circle ${~~x} ${~~y} ${~~z} 0 "${x},${y},${z}"`);
        let remove = () => dim.runCommand(`tickingarea remove "${x},${y},${z}"`);
        return new Promise(async resolve => {
            mc.system.runJob(function* () {

                let trials = 1e3;
                do {
                    block = getBlock();
                    if (!--trials) yield void remove();
                } while (!block);
                remove();
                return resolve(block);
            }())
        })
    }
};


/**@type {(target:any, identity?:mc.ScoreboardIdentity)=>{[obj:string]:number}} */
export const scores = (({ scoreboard }, playerType, map, zero, empty, symbol, getObjective = (o) =>
    (map.get(o = typeof o === symbol && Symbol.keyFor(o) ? o : Symbol.for(o)))?.isValid?.() ? map.get(o)
        : (map.set(o, scoreboard.getObjective(o.description)
            ?? scoreboard.addObjective(o.description, o.description)
        ).get(o))) => (target, identity = map.get(target)?.isValid?.()
            ? map.get(target) : (map.set(target, target?.constructor === String ? (pt => {
                for (pt of scoreboard.getParticipants()) if (pt.type !== playerType && target === pt.displayName) return pt;
            })() : target.scoreboardIdentity).get(target))) =>
        new Proxy({}, {
            get(_, obj) { return !identity ? zero : getObjective(obj).getScore(identity ?? (target || empty)) ?? zero; },
            set(_, obj, score) { return getObjective(obj).setScore(identity ?? (target || empty), score), true; },
            deleteProperty(_, obj) { return getObjective(obj).removeParticipant(identity ?? (target || empty)), true; }
        })
)(mc.world, mc.ScoreboardIdentityType.Player, new Map(), 0, '', Symbol.name.toLowerCase());


/**@param {mc.Entity} e  */
export function isMoving(e, timer = 1e3) {
    let rot = e.getRotation(), loc; {
        const l = e.location;
        loc = `${l.x},${l.y},${l.z}`
    }
    return new Promise(async (resolve, reject) => {
        let pitch, yaw, x, y, z;
        const runId = mc.system.runInterval(() => {
            if (!timer-- || !e.isValid()) return mc.system.clearRun(runId), reject();
            ({ x, y, z } = e.location);
            ({ x: pitch, y: yaw } = e.getRotation());
            if (!(loc === `${x},${y},${z}` && pitch == rot.x && yaw == rot.y))
                return mc.system.clearRun(runId), resolve();
        })
    })
}


const gets = /get\w+(s$)/;
const commons = new WeakSet([
    Object.getPrototypeOf(/ /),
    Object.getPrototypeOf(new Map()),
    Object.getPrototypeOf(new Set()),
    Object.getPrototypeOf(new Array()),
    Object.getPrototypeOf(new WeakMap()),
    Object.getPrototypeOf(new WeakSet()),
    Object.prototype
]);
export const getAllScripts = function Module(e = {}, map = new Map()) {
    const props = Object.getOwnPropertyDescriptors(e);
    for (const key of [
        ...Object.getOwnPropertyNames(props),
        ...Object.getOwnPropertySymbols(props)/*@ts-ignore*/
    ]) map.set(key, props[key]);
    return commons.has(Object.getPrototypeOf(e)) || e[Symbol.toStringTag] === Module.name ? map : getAllScripts(Object.getPrototypeOf(e), map);
};
const yesMethods = new WeakSet(); {
    for (const { type, keys } of [
        { type: mc.ItemStack, keys: ['getLore'] },
        { type: mc.ContainerSlot, keys: ['getLore'] }
    ]) {
        if (!type) continue;
        for (const key of keys) {
            const { value } = Object.getOwnPropertyDescriptor(type.prototype, key) ?? {}
            typeof value == 'function' ? yesMethods.add(value) : null;
        }
    }
};

const noMethods = new WeakSet(); {
    for (const { type, keys } of [
        { type: mc.Entity, keys: ['kill', 'getComponents'] },
        { type: mc.Block, keys: ['getComponents'] },
        { type: mc.ItemStack, keys: ['getComponents', 'getLore'] },
        { type: mc.Scoreboard, keys: ['getParticipants', 'getObjectives'] },
        { type: mc.World, keys: ['getPlayers', 'getAllPlayers'] },
        { type: mc.Dimension, keys: ['getPlayers', 'getEntities'] }
    ]) {
        if (!type?.prototype) continue;
        for (const key of keys) {
            const { value } = Object.getOwnPropertyDescriptor(type.prototype, key) ?? {}
            typeof value == 'function' && noMethods.add(value);
        }
    }
}



export const reveal = async function (subject, str = 5, n1 = 0, send = console.warn,
    normalized = 'normalized', get = 'get', global = 'globalThis',
    symbolType = 'symbol', bigintType = 'bigint',
    stringType = 'string', numberType = 'number',
    booleanType = 'boolean', undefinedType = 'undefined',
    objectType = 'object', functionType = 'function',
    S = {
        four: '§4', nine: '§9', c: '§c', s: '§s', a: '§a', f: '§f', p: '§p', e: '§e', r: '§r', u: '§u',
        fr: '()§r', ƒ: 'ƒ ()', _: '~', empty: '', hash: '#', iter: '[§fSymbol.iterator§r]§9()§r',
        for: v => Symbol.keyFor(v) ? 'Symbol.for(' + v.description + ')' : v.toString()
    }) {
    if ((subject || n1) instanceof Error) {
        let { name, message, stack } = subject;
        subject = { name, message: !message ? null : message, stack: stack.split(`\n`).map(e => e.trim()).filter(e => e) };
    }


    async function _get(_subject, n2) {
        function deepMap(_sub, n3) {
            try { _sub = Array.from(_sub) }
            catch (error) { return error.message }
            let l = _sub.length;
            return new Promise(async resolve => {
                let _are = [], i = n1;
                while (i < l) _are.push(await _get(_sub[i++], n3 + str));
                resolve(_are);
            })
        };
        try {
            switch (typeof _subject) {
                case booleanType: case numberType: case undefinedType: return _subject;
                case stringType: return _subject; case bigintType: return _subject?.toString?.();
                case symbolType: return S.for(_subject);
                case functionType: return _subject.toString();
                case objectType: if (_subject === null) return _subject;
            };
            const { r } = S;
            var result = {};
            if (Array.isArray(_subject)) result = await deepMap(_subject, n2 + str)
            if (Symbol.iterator in _subject) result[S.nine + _subject.constructor?.name + r + S.iter] = await deepMap(_subject, n1 + str);
            for (const [key, script] of getAllScripts(_subject)) await switchCase(_subject, key, script);
            async function switchCase(_sub, key, { enumerable: e, set, get }) {
                if (Symbol.iterator == key) return;
                try {
                    var value = _sub[key];
                } catch (error) {
                    value = S.c + (error.message || error)?.toString() + S.r;
                }
                let key1 = (typeof key !== symbolType ? key : `[${S.for(key)}]`);
                key1 = !set ? ((!e ? S.hash : S.empty) + key1) : S._ + ((!e ? S.hash : S.empty) + key1);
                if (key === global) return result[S.e + key1 + r] = _sub;
                switch (typeof value) {
                    case booleanType: return void (result[S.c + key1 + r] = value);
                    case numberType: return void (result[S.s + key1 + r] = value);
                    case stringType: return void (result[S.a + key1 + r] = value);
                    case undefinedType: return void (result[S.four + key1 + r] = value + '');
                    case symbolType: return void (result[S.f + key1 + r] = S.for(value));
                    case bigintType: return void (result[S.p + key1 + r] = value.toString());
                    case objectType: return void (result[S.e + key1 + r] = value !== null ? await _get(value, n1 + str) : null);
                    case functionType: {
                        switch (true) {
                            case yesMethods.has(value): return void (result[S.nine + key1 + S.fr] = await _get(_sub[key](), n1 + str));
                            case noMethods.has(value) || !key1.startsWith(get): return void (result[S.u + key1 + S.fr] = value.name || S.ƒ);
                            case key1 === normalized: return void (result[S.nine + key1 + S.fr] = await _get((n => ({ x: n.x, y: n.y, z: n.z }))(_sub[key]()), n1 + str));
                            case gets.test(key1): return void (result[S.nine + key1 + S.fr] = await _get(_sub[key](), n1 + str));
                            default: return void (result[S.u + key1 + S.fr] = value.name || S.ƒ);
                        }
                    }
                }
            }
            return result;
        } catch (error) {
            /*report(error)*/;
            (result.errors ??= []).push({ [error.message || "stack"]: error.stack.split("\n") });
            return result
        }
    };
    const result = await _get(subject, n1)
    return (send || (m => import('@minecraft/server').then(({ world, MinecraftDimensionTypes: { overworld } }) =>
        world.getDimension(overworld).runCommand('w @a[tag=agent] §r' + m))))
        (typeof result == 'undefined' ? 'undefined' : JSON.stringify(result, null, str)
            ?.replace(/(\{|,)\n(\s+)"(((§.(|~|~#|#))(\w+|\d+|\[|\])(.+|))(§.)|\d+)":/g, s => s.split('"').join('')));
};

Object.defineProperty(Object.prototype, 'copy', {
    value: function Copy(param = this) {
        switch (typeof param) {
            case "string": case "number": case "boolean": return param;
            case "undefined": return `${param}`;
        }
        if (Array.isArray(param) || Symbol.iterator in param) return Array.from(param, Copy);
        const O = {};
        for (const key in param) {
            const value = param[key]
            switch (typeof value) {
                case "string": case "number": case "boolean": O[key] = value; continue;
                case "undefined": O[key] = `${value}`; continue;
                case "object": O[key] = value ? Copy(value) : value !== null || null; continue;
                case "function": O[key] = value;
            }
        } return O
    }
});

/**@type {(prototype: any, object: any) => any} */
export var OverTakesJS; {
    const { defineProperties: a, getOwnPropertyDescriptors: b, getPrototypeOf: c, setPrototypeOf: z } = Object;
    OverTakesJS = (prototype, object, getObject = false) => {
        const prototypeOrigin = z(a({}, b(prototype)), c(prototype));
        z(object, prototypeOrigin);
        a(prototype, b(object));
        return getObject ? object : null;
    };
};


