import { responseSuccess, responseError } from '../helpers/response.helper.js';
import Computadora from '../models/computadora.model.js';
import Joi from 'joi';

const computadoraSchema = Joi.object({
  nombreAlumno: Joi.string().required(),
  hertz: Joi.number().min(4).max(7).required(),
  marcaProcesador: Joi.string().min(5).optional(),
  ramGB: Joi.number().min(4).max(24).required(),
  marca: Joi.string().min(2).required(),
});

const getComputadorasHandler = async (req, res) => {
  try {
    const computadoras = await Computadora.find();
    if (computadoras.length === 0) {
      return res.status(404).json(responseError(req.__('no_computadoras_found')));
    }
    res.status(200).json(responseSuccess(req.__('computadoras_obtained_success'), computadoras));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseError(req.__('internal_server_error')));
  }
};

const postComputadoraHandler = async (req, res) => {
  const { error } = computadoraSchema.validate(req.body);
  if (error) {
    return res.status(400).json(responseError(error.details[0].message));
  }

  try {
    const existing = await Computadora.findOne({ nombreAlumno: req.body.nombreAlumno });
    if (existing) {
      return res.status(409).json(responseError(req.__('computadora_duplicate')));
    }

    const newComputadora = await Computadora.create(req.body);
    res.status(201).json(responseSuccess(req.__('computadora_created_success'), newComputadora));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseError(req.__('internal_server_error')));
  }
};

export { getComputadorasHandler, postComputadoraHandler };