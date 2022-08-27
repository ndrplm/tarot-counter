import { Field } from 'formik'

const ManualCount = () => (
  <>
    <label>Entrez le nombre de points</label>
    <Field type="number" max={91} />
  </>
)

export default ManualCount
