import * as Yup from 'yup'

export default Yup.object().shape({
  bonus: Yup.number().required('required'),
  distanceMin: Yup.number().required('required'),
  distanceMax: Yup.number().required('required'),
})
