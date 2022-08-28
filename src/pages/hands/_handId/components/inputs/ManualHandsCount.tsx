import { Field } from 'formik'

const ManualCount = () => (
  <>
    <label>Entrez le nombre de points</label>
    <Field type="number" name="taker.pointsCount" max={91} min={0} />
  </>
)

export default ManualCount
