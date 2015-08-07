import { expect } from 'chai'
import sinon from 'sinon'
import wrapper from '../src'

describe('custom promie for package', () => {
  var promiseObj = {resolve: () => {}, reject: () => {}}
  var proxy
  var wrapped

  beforeEach(() => {
    proxy = sinon.spy((promise) => { return {promise: promise} })
    wrapped = wrapper(proxy)
  })

  it('init package', () => {
    expect(wrapped(promiseObj)).to.deep.equal({promise: promiseObj})

    expect(proxy.calledOnce).to.be.true
    expect(proxy.calledWithExactly(promiseObj)).to.be.true
  })

  it('use cached value', () => {
    expect(wrapped(promiseObj)).to.deep.equal({promise: promiseObj})
    expect(wrapped(promiseObj)).to.deep.equal({promise: promiseObj})

    expect(proxy.calledOnce).to.be.true
    expect(proxy.calledWithExactly(promiseObj)).to.be.true
  })
})
