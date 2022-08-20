import { render } from '@testing-library/react'
import UserDialog from '../../../components/dialog/userDialog';


it('renders homepage unchanged', () => {
  const { container } = render(<UserDialog
    isOpen={true}
    onSubmit={() => { }}
    onClose={() => { }}
    isEdit={false}
    data={{}}
    isLoading={false}
  />);
  expect(container).toMatchSnapshot()
})
