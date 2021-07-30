import useTranslation from 'next-translate/useTranslation'
import { IconButton, Tooltip } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import useStyles from './styles'

interface Props {
  handleSave: () => void
  handleCancel: () => void
}

const ActionsCreate = ({ handleSave, handleCancel }: Props): JSX.Element => {
  const classes = useStyles()
  const { t } = useTranslation('editProfile')

  return (
    <div className={classes.wrapper}>
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
    </div>
  )
}

export default ActionsCreate
