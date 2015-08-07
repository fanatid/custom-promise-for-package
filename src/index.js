export default function wrapper (initfn) {
  var instances = new Map()

  return function (Promise) {
    if (!instances.has(Promise)) {
      instances.set(Promise, initfn(Promise))
    }

    return instances.get(Promise)
  }
}
