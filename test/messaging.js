const Messaging = artifacts.require('./Messaging.sol')
const assert = require('assert')
let contractInstance

contract('Messaging', (accounts) => {
    beforeEach(async () => {
        contractInstance = await Messaging.deployed()
     })
    it('should add a message to an address', async () => {
        await contractInstance.sendMessage(accounts[0], 'this is a short text')
  
        const newAddedTodo = await contractInstance.messages(accounts[0], 0)
        const todoContent = newAddedTodo[1]
        
        assert.equal(todoContent, 'this is a short text', 'The content of the new message is not correct')
    })
    it('should add a message to differents addreses', async () => {
        await contractInstance.sendMessage(accounts[0], 'this is a short text')
        await contractInstance.sendMessage(accounts[1], 'this is a short text2')

        const newAddedTodo = await contractInstance.messages(accounts[1], 0)
        const todoContent = newAddedTodo[1]

        assert.equal(todoContent, 'this is a short text2', 'The content of the message is not correct')
    })
    it('should set a public key with a text description', async () => {
        await contractInstance.setPublicKey('key1','This is a public key')

        const newKey = await contractInstance.keys(accounts[0])
        const keyContent = newKey[1]

        assert.equal(keyContent, 'This is a public key', 'The content of the key is not correct')
    })
    it('should get the correct public key', async () => {
        const keyContent = await contractInstance.getPublicKey(accounts[0])
        assert.equal(keyContent[1], 'This is a public key', 'The content of the key is not correct')
    })
    it('should add two messages to an addreses', async () => {
        await contractInstance.sendMessage(accounts[2], 'this is a short text')
        await contractInstance.sendMessage(accounts[2], 'this is a short text2')

        const newAddedTodo = await contractInstance.messages(accounts[2], 1)
        const todoContent = newAddedTodo[1]

        assert.equal(todoContent, 'this is a short text2', 'The content of the second message is not correct')
    })
    it('should get last message of an addreses', async () => {
        const lastMessage = await contractInstance.getLastMessage(accounts[2])
        assert.equal(lastMessage[1], 'this is a short text2', 'The content of the second message is not correct')
    })
    it('should add a hash message to an address', async () => {
        await contractInstance.sendMessage(accounts[3], web3.toHex('this is a short hash text'))
  
        const newAddedTodo = await contractInstance.messages(accounts[3], 0)
        const todoContent = newAddedTodo[1]
        
        assert.equal(todoContent, web3.toHex('this is a short hash text'), 'The content of the new message is not correct')
    })
})