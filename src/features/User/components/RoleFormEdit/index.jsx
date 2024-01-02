import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import ComboBoxField from '../../../../components/form-controls/ComboBoxField';
import RadioGroupField from '../../../../components/form-controls/RadioGroupField';

function RoleFormEdit(props) {
  const { role } = props;

  const schema = yup.object({
    selectedRole: yup.object().required('Please enter the required field.'),
  });

  const listAction = [
    { id: 1, title: 'Criteria Management', name: 'mCriteria', value: role.mCriteria },
    { id: 2, title: 'Service Management', name: 'mService', value: role.mService },
    { id: 3, title: 'Manage System', name: 'mSystem', value: role.mSystem },
    { id: 4, title: 'User Management', name: 'mUser', value: role.mUser },
  ];
  const options = [
    { label: '', value: 1 },
    { label: '', value: 7 },
    { label: '', value: 15 },
  ];

  const form = useForm({
    defaultValues: {
      userId: role.userId,
      mCriteria: listAction[0].value,
      mService: listAction[1].value,
      mSystem: listAction[2].value,
      mUser: listAction[3].value,
      selectedRole: { label: role.role.label, roleId: role.role.roleId },
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };
  // const clearForm = (event) => {};
  const clearForm = () => {
    form.setValue('mCriteria', 0);
    form.setValue('mService', 0);
    form.setValue('mUser', 0);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="d-flex justify-content-between mb-3">
        <div style={{ width: '40%' }}>
          <ComboBoxField name="selectedRole" label="Select role*" form={form} options={role.roles} />
        </div>
        <div>
          <Button variant="contained" sx={{ mt: 5 }} onClick={clearForm}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="row mx-0 border rounded-top bg-primary text-white">
        <div className="col-4 d-flex justify-content-center align-items-center">Action</div>
        <div className="col-2 d-flex justify-content-center align-items-center">Read</div>
        <div className="col-3 d-flex justify-content-center align-items-center">Create, Read, Update</div>
        <div className="col-3 d-flex justify-content-center align-items-center text-center">
          Create, Read, Update, Change Status
        </div>
      </div>
      {listAction.map((action) => (
        <div
          key={action.id}
          className={
            'row border mx-0' + (action.id === 4 ? ' rounded-bottom' : '') + (action.id === 3 ? ' d-none' : '')
          }
        >
          <RadioGroupField form={form} name={action.name} label={action.title} options={options} />
        </div>
      ))}

      <div className="text-end">
        <Button variant="contained" className="bg-secondary" sx={{ mt: 3, mb: 2, mr: 1 }} onClick={props.handleClose}>
          Cancel
        </Button>
        {/* <Button variant="contained" sx={{ mt: 3, mb: 2, mr: 1 }} onClick={clearForm}>
          Clear All
        </Button> */}
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save changes
        </Button>
      </div>
    </form>
  );
}

export default RoleFormEdit;
