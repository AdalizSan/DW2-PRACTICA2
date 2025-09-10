import mongoose from 'mongoose';

const computadoraSchema = new mongoose.Schema({
  nombreAlumno: {
    type: String,
    required: true,
  },
  hertz: {
    type: Number,
    required: true,
    min: 4,
    max: 7,
  },
  marcaProcesador: {
    type: String,
    minlength: 5,
    required: false, 
  },
  ramGB: {
    type: Number,
    required: true,
    min: 4,
    max: 24,
  },
  marca: {
    type: String,
    required: true,
    minlength: 2,
  },
});

computadoraSchema.index({ nombreAlumno: 1 }, { unique: true });

const Computadora = mongoose.model('Computadora', computadoraSchema);

export default Computadora;