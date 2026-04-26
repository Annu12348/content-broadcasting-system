class IUserRespository {
    async createdUser (userData) {
        throw new Error("method not implemented")
    }

    async findEmail (email) {
        throw new Error("method not implemented")
    }

    async findById (userId) {
        throw new Error("method not implemented")
    }
}

export default IUserRespository;