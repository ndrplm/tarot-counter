import { Field } from 'formik'

const OudlersInput = () => (
  <div>
    <label>Combien de bouts posséde le preneur ? </label>
    <Field type="number" name="taker.oudlersCount" min={0} max={3} />
  </div>
)
export default OudlersInput
