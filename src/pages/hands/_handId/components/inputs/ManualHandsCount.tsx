import { Field } from 'formik'

const ManualCount = () => (
  <>
    <label>Entrez le nombre de points</label>
    <Field type="number" step="any" name="taker.pointsCount" max={91} min={0} />
  </>
)

export default ManualCount
