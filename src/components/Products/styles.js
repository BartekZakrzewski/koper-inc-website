import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    //backgroundColor: "#181818",
    padding: theme.spacing(0),
  },
  root: {
    flexGrow: 1,
  },
  //log: console.log(theme.palette.background.default)
}));