import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { newEventContext } from "../pages/admin/events/new";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { editEventContext } from "../pages/admin/events/[id]/edit";

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];

export default function SplitButton({
  options = [],
  disable = false,
  handleError,
}) {
  const { newEventForm, setNewEventForm } = React.useContext(newEventContext);

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = async () => {
    setLoading(true);
    const statusN = options[selectedIndex].toLowerCase();
    // setLoading(false);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/events",
        { ...newEventForm, status: statusN },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      router.push("/admin/events/" + data._id);
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleError();
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        disableElevation
        color="success"
        disabled={disable}
      >
        <LoadingButton
          variant="contained"
          disableElevation
          loading={loading}
          onClick={handleClick}
        >
          {options[selectedIndex]}
        </LoadingButton>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

const capitalize = (myStr) => {
  const capitalizedStr = myStr?.replace(/^\w/, (c) => c.toUpperCase());
  return capitalizedStr; // Output: Hello world
};

export function SplitEditButton({ options = [], disable = false }) {
  const { newEventForm, setNewEventForm } = React.useContext(editEventContext);

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (options) {
      setSelectedIndex(
        options.findIndex(
          (element) => element === capitalize(newEventForm?.status)
        )
      );
    }
  }, [newEventForm, options]);

  const handleClick = async () => {
    setLoading(true);
    const statusN = options[selectedIndex].toLowerCase();
    // setLoading(false);
    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/events/" + router.query.id,
        { ...newEventForm, status: statusN },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      console.log(data);
      router.push("/admin/events/" + router.query.id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        disableElevation
        color="success"
        disabled={disable}
      >
        <LoadingButton
          variant="contained"
          disableElevation
          loading={loading}
          onClick={handleClick}
        >
          {options[selectedIndex]}
        </LoadingButton>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
