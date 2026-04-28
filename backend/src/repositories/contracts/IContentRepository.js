class IContentRepository {
    async uploadContent (contentData) {
        throw new Error("method not implemented")
    }

    async findById (id) {
        throw new Error("method not implemented")
    }
}

export default IContentRepository;