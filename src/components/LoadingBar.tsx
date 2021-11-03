import { LinearProgress, styled } from "@mui/material";

const AppbarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);
const LoadingBar = styled(props => (
  <div {...props}>
    <AppbarOffset />
    <LinearProgress />
  </div>
))({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 2
});

export default LoadingBar;
