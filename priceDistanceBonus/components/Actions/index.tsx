import useTranslation from 'next-translate/useTranslation'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import useStyles from './styles'

interface Props {
  edit: boolean
  handleEdit: () => void
  handleSave: () => void
  handleCancel: () => void
  onHandleDelete: () => void
}

const Actions = ({
  edit,
  handleEdit,
  handleSave,
  handleCancel,
  onHandleDelete,
}: Props): JSX.Element => {
  const classes = useStyles()
  const { t } = useTranslation('editProfile')

  return (
    <>
      <div className={classes.wrapper}>
        {edit ? (
          <>
            <Tooltip title={t('action_save')}>
              <IconButton classes={{ root: classes.save }} onClick={handleSave}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('action_cancel')}>
              <IconButton classes={{ root: classes.cancel }} onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title={t('action_edit')}>
            <IconButton classes={{ root: classes.edit }} onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={t('action_delete')}>
          <IconButton classes={{ root: classes.delete }} onClick={onHandleDelete}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  )
}

export default Actions
