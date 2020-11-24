import Spruce from '@ryangjchandler/spruce'

Spruce.store('wallet', {
    logged: 'false',
    account: '',
    nonce: '22'
})

//possible states: unready | ready | ongoing
Spruce.store('engine', {
    state: 'unready'
})

export default Spruce 