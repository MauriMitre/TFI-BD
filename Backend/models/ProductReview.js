const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductReviewSchema = Schema({
    review_id: {
        type: Number,
        unique: true
    },
    product_id: {
        type: String,
        required: [true, 'El ID del producto es obligatorio']
    },
    rating: {
        type: Number,
        required: [true, 'La calificación es obligatoria'],
        min: 1,
        max: 5
    },
    review_text: {
        type: String,
        required: [true, 'El texto de la reseña es obligatorio']
    },
    reviewer_name: {
        type: String
    },
    reviewer_email: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Índices para optimizar búsquedas
ProductReviewSchema.index({ product_id: 1 }); // Búsqueda rápida por producto
ProductReviewSchema.index({ rating: 1 });     // Filtrado rápido por calificación
ProductReviewSchema.index({ product_id: 1, rating: -1 }); // Ordenar reseñas de un producto por calificación descendente

ProductReviewSchema.plugin(AutoIncrement, { inc_field: 'review_id' });

module.exports = model('ProductReview', ProductReviewSchema, 'product_reviews');
