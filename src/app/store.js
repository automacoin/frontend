import Spruce from '@ryangjchandler/spruce'

Spruce.store('wallet', {
    logged: window.zilPay?.wallet.isEnable && window.zilPay?.wallet.isConnect,
    account: window.zilPay?.wallet.defaultAccount?.base16,
})

export default Spruce 