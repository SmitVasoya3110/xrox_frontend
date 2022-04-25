import FuseAnimate from "@fuse/core/FuseAnimate";
// import FuseChipSelect from "@fuse/core/FuseChipSelect";
import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useForm, useDeepCompareEffect } from "@fuse/hooks";
// import FuseUtils from "@fuse/utils";
import _ from "@lodash";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import TextField from '@material-ui/core/TextField';
//  validation fomsy
import { TextFieldFormsy } from "@fuse/core/formsy";
import Formsy from "formsy-react";
//

// import clsx from "clsx";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";


import reducer from "../../../Redux_Store/index";
// import {
//   newMachine,
//   resetMachine,
//   getMachine,
//   saveMachine,
//   updateMachine,
// } from "../../../Redux_Store/Machine_Slice/machineAdd_Slice";
import { newShift, resetShift, getShift, saveShift, updateShift } from "../../../Redux_Store/Shift_Slice/shiftAdd_Slice"
import { selectMachineCat, getMachineCat } from "../../../Redux_Store/Machine_Slice/machineCatDrop_Slice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function Shift(props) {
  const dispatch = useDispatch();
  const Shift = useSelector(({ ERP }) => ERP.Shift);
  // console.log("Shift", Shift);
  const theme = useTheme();
  const classes = useStyles(props);
  // const [tabValue, setTabValue] = useState(0);
  const [noStitching, setNoStitching] = useState(false);
  const { form, setForm, handleChange } = useForm(null);
  const routeParams = useParams();
  // const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); //validation
  const formRef = useRef(null); //validation
  let backPath = "/apps/shiftList";

  console.log("form", form);
  useDeepCompareEffect(() => {
    function updateProductState() {
      const { type_id } = routeParams;

      if (type_id === "new") {
        dispatch(newShift());
      } else {
        dispatch(getShift(routeParams)).then((action) => {
          // console.log("action ", action.payload);
          if (!action.payload) {
            setNoStitching(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    console.log("f", form);
    console.log("s", Shift);

    if ((Shift && !form) || (Shift && form && Shift.id !== form.id)) {
      setForm(Shift);
      console.log("? set fromr");
    }
  }, [form, Shift, setForm]);

  useEffect(() => {
    dispatch(getMachineCat());
    return () => {
      dispatch(resetShift());
      setNoStitching(false);
    };
  }, [dispatch]);

  const handleClick = async (form) => {
    const { type_id } = routeParams;
    if (type_id === "new") {
      dispatch(saveShift(form)).then((data) => {
        if (!data.error) {
          props.history.push(backPath);
        }
      });
    } else {
      dispatch(updateShift(form)).then((data) => {
        if (!data.error) {
          props.history.push(backPath);
        }
      });
    }
  };

  if (noStitching) {
    return (
      <FuseAnimate delay={100}>
        <div className="flex flex-col flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There is no such Shift!
          </Typography>
          <Button
            className="normal-case mt-24"
            component={Link}
            variant="outlined"
            to={backPath}
            color="inherit"
          >
            Go to Shift List Page
          </Button>
        </div>
      </FuseAnimate>
    );
  }

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function canBeSubmitted() {
    return !_.isEqual(Shift, form);
  }
  return (
    <Formsy
      onValid={enableButton}
      onInvalid={disableButton}
      ref={formRef}
      className="flex flex-1 w-full items-center justify-between"
    >
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={
          form && (
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Typography
                    className="normal-case flex items-center sm:mb-12"
                    component={Link}
                    role="button"
                    to={backPath}
                    color="inherit"
                  >
                    <Icon className="text-20">
                      {theme.direction === "ltr"
                        ? "arrow_back"
                        : "arrow_forward"}
                    </Icon>
                    <span className="mx-4">Shift List</span>
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">
                        {form.shiftName ? form.shiftName : "New Shift"}
                      </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Shift Details</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-nowrap normal-case"
                  variant="contained"
                  color="secondary"
                  disabled={!isFormValid || !canBeSubmitted()}
                  onClick={() => handleClick(form)}
                >
                  Save Shift
                </Button>
              </FuseAnimate>
            </div>
          )
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {/* {tabValue === 0 && ( */}
              <div>
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  label="Shift Name"
                  id="shiftName"
                  name="shiftName"
                  value={form.shiftName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
                <div className="flex -mx-4">
                  <TextField
                    className="mt-8 mb-16 mx-4"
                    id="startTime"
                    label="Start-Time"
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    style={{ width: '12%' }}
                    defaultValue="00:00"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                  <TextField
                    className="mt-8 mb-16 mx-4"
                    id="endTime"
                    label="End-Time"
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    style={{ width: '12%' }}
                    defaultValue="00:00"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />


                </div>

              </div>
            </div>
          )
        }
        innerScroll
      />
    </Formsy>
  );
}

export default withReducer("ERP", reducer)(Shift);
