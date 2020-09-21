import Spruce from '@ryangjchandler/spruce'

console.log(window.zilPay?.wallet, window.zilPay?.wallet.isEnable, window.zilPay?.wallet.isConnect, window.zilPay?.wallet.isEnable && window.zilPay?.wallet.isConnect)
Spruce.store('wallet', {
    logged: window.zilPay?.wallet.isEnable && window.zilPay?.wallet.isConnect,
    account: window.zilPay?.wallet.defaultAccount?.base16,
})

console.log(Spruce.store('wallet'))

Spruce.watch('wallet.logged', (old, next) => {
    console.log('old: ', old, 'new: ', next);
})

export default Spruce 