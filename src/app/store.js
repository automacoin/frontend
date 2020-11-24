import Spruce from '@ryangjchandler/spruce'

Spruce.store('wallet', {
    logged: 'false',
    account: 'not connected',
    nonce: '22',
    balance:'--',
})

//possible states: unready | ready | ongoing
Spruce.store('engine', {
    state: 'unready'
})

export default Spruce 