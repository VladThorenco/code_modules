import { Dialog, DialogActions, DialogTitle, Button, Grid } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  open: boolean
  handleClose: () => void
  handleDelete: () => void
}

const DeleteModal = ({ open, handleClose, handleDelete }: Props): JSX.Element => {
  const { t } = useTranslation('editProfile')
  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>{t('deleteTitle')}</DialogTitle>
      <DialogActions>
        <Grid container spacing={2} justify="flex-end">
          <Grid item>
            <Button onClick={handleClose} color="primary" variant="contained">
              {t('forms:buttonCancel')}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleDelete} color="secondary" variant="contained">
              {t('forms:buttonDelete')}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteModal
