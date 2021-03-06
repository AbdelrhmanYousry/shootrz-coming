import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  selectDate,
  setActiveStep,
  changeHour,
  changeMintue,
  changeAm,
  showValidationError,
  selectLocation
} from "./actions"
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { Row, Col } from "reactstrap"

const DateStep = ({
  selectDate,
  selectedDate,
  setActiveStep,
  showValidationError,
  changeHour,
  changeMintue,
  changeAm,
  hour,
  minute,
  am,
  dateChanged
}) => {
  const today = new Date();
  const after3Days = today.setDate(today.getDate() + 3);
  const handleDateChange = date => {
    selectDate({ date })
    showValidationError("")
  }
  const handleClickNext = () => {
    if(dateChanged) {
      setActiveStep({ activeStep: 4 })
      showValidationError("")
    } else {
      showValidationError("Please provide your event date and time.")
    }
  }
  const handleChangeHour = ({target}) => {
    changeHour({hour: target.value})
    showValidationError("")
  }
  const handleChangeMinute = ({target}) => {
    changeMintue({minute: target.value})
    showValidationError("")
  }
  const handleChangeAm = ({target}) => {
    changeAm({am: target.value})
    showValidationError("")
  }
  const fontStyle = {
    fontFamily: "AGRegular",
  }
  return (
    <div className="book-page__date">
      <h1>When do you need the photographer?</h1>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Row>
          <Col sm="6">
            <h1>Date</h1>
            <Calendar
              onChange={handleDateChange}
              date={selectedDate}
              minDate={after3Days}
            />
          </Col>
          <Col sm="6" className="d-flex flex-column">
            <h1>Time</h1>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-filled-label">Hour</InputLabel>
              <Select value={hour} onChange={handleChangeHour} style={fontStyle}>
                {(am === "am" ? [7, 8, 9, 10, 11, 12] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] ).map(i => (
                  <MenuItem value={i} key={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-filled-label">
                Minute
              </InputLabel>
              <Select value={minute} onChange={handleChangeMinute} style={fontStyle}>
                {[
                  "00",
                  "15",
                  "30",
                  "45"
                ].map(i => (
                  <MenuItem value={i} key={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <Select value={am} onChange={handleChangeAm} style={fontStyle}>
                <MenuItem value="am">am</MenuItem>
                <MenuItem value="pm">pm</MenuItem>
              </Select>
            </FormControl>
            <button
              className="book-page__location__next mt-3"
              onClick={handleClickNext}
            >
              Next
            </button>
          </Col>
        </Row>
      </MuiPickersUtilsProvider>
    </div>
  )
}

const mapStateToProps = ({ book: { selectedDate, hour, minute, am, dateChanged } }) => ({
  selectedDate,
  hour,
  minute,
  am,
  dateChanged,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectDate,
      setActiveStep,
      changeHour,
      changeMintue,
      changeAm,
      showValidationError
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateStep)
