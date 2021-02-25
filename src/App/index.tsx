import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import TimePicker from "TimePicker"
import Clock from "Clock"

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TimePicker} />
            <Route exact path="/:minutes" component={Clock} />
            <Redirect to="/" />
        </Switch>
    </Router>
)
