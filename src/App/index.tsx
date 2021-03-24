import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import TimePicker from "TimePicker"
import Clock from "Clock"
import Providers from "Providers"
import NewTimeEntry from "NewTimeEntry"

export default () => (
    <Providers>
        <Router>
            <Switch>
                <Route exact path="/" component={TimePicker} />
                <Route exact path="/new" component={NewTimeEntry} />
                <Route exact path="/:minutes" component={Clock} />
                <Redirect to="/" />
            </Switch>
        </Router>
    </Providers>
)
