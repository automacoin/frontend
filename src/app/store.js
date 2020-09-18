import Spruce from '@ryangjchandler/spruce'

Spruce.store('wallet', {
    logged: window.zilPay?.wallet.isEnable.toString(),
    account: window.zilPay?.wallet.defaultAccount?.base16.toString()
})

export default Spruce