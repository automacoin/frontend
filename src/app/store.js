import Spruce from '@ryangjchandler/spruce'

Spruce.store('wallet', {
    logged: window.zilPay?.wallet.isEnable && window.zilPay?.wallet.isConnect,
    account: window.zilPay?.wallet.defaultAccount?.base16,
})

//possible states: unready | ready | ongoing
Spruce.store('engine', {
    state: 'unready'
})

Spruce.store('wallet', {
    nonce: null
})

export default Spruce 