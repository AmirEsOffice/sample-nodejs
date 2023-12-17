function PostCard(name, description, category,image) {  
    this.name = name || null;
    this.description = description || null;
    this.category = category || null;
    this.image = image || null;
}

module.exports = PostCard;