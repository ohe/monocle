// Monocle.
// Copyright (C) 2019-2020 Monocle authors

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PropTypes from 'prop-types'

import TopMenu from './components/menu'
import {
  LoginView,
  CUserView
} from './components/user'
import { CChangesLifeCycleStats } from './components/changes_lifecycle'
import { CChangesReviewStats } from './components/changes_review'
import {
  CNewContributorsStats,
  CMostActiveAuthorsStats,
  CMostReviewedAuthorsStats,
  CAuthorsPeersStats
} from './components/top'
import {
  CRepoChanges,
  CHotChanges,
  CColdChanges,
  CAbandonedChanges,
  CAbandonedChangesFull,
  CLastChanges,
  CLastMergedChanges,
  CLastOpenedChanges
} from './components/changes'
import { CApprovalStats } from './components/approvals'
import { CFiltersForm } from './components/filtersform'
import { CChange } from './components/change'
import CAuthorsMergedPie from './components/authors_merged_pie'
import CReposMergedPie from './components/repos_merged_pie'
import CAuthorsOpenedPie from './components/authors_opened_pie'
import CReposOpenedPie from './components/repos_opened_pie'
import TopView from './top_view'

class RootView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <TopMenu index={this.props.match.params.index} />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CFiltersForm
                history={this.props.history} />
            </Col>
          </Row>
          <Row><Col><p></p></Col></Row>
          <Tabs defaultActiveKey="events stats" id="uncontrolled-tab-example">
            <Tab eventKey="events stats" title="Events stats">
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CChangesLifeCycleStats
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CChangesReviewStats
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CMostActiveAuthorsStats
                    search={this.props.location.search}
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CApprovalStats
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CMostReviewedAuthorsStats
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CNewContributorsStats
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CAuthorsPeersStats
                    index={this.props.match.params.index} />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="changes" title="Changes status">
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CLastChanges
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CRepoChanges
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CHotChanges
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CColdChanges
                    index={this.props.match.params.index} />
                </Col>
              </Row>
              <Row><Col><p></p></Col></Row>
              <Row>
                <Col>
                  <CAbandonedChanges
                    index={this.props.match.params.index} />
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </React.Fragment>)
  }
}

RootView.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string
    })
  })
}

class MergedChangesView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <TopMenu index={this.props.match.params.index} />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CFiltersForm
                history={this.props.history} />
            </Col>
          </Row>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CAuthorsMergedPie
                index={this.props.match.params.index} />
            </Col>
            <Col>
              <CReposMergedPie
                index={this.props.match.params.index} />
            </Col>
          </Row>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CLastMergedChanges
                history={this.props.history}
                index={this.props.match.params.index} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

MergedChangesView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string
    })
  })
}

class OpenChangesView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <TopMenu index={this.props.match.params.index} />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CFiltersForm
                history={this.props.history} />
            </Col>
          </Row>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CAuthorsOpenedPie
                index={this.props.match.params.index} />
            </Col>
            <Col>
              <CReposOpenedPie
                index={this.props.match.params.index} />
            </Col>
          </Row>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CLastOpenedChanges
                history={this.props.history}
                index={this.props.match.params.index} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

OpenChangesView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string
    })
  })
}

class AbandonedChangesView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <TopMenu index={this.props.match.params.index} />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CFiltersForm
                history={this.props.history} />
            </Col>
          </Row>
          <Row><Col><p></p></Col></Row>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CAbandonedChangesFull
                history={this.props.history}
                index={this.props.match.params.index} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

AbandonedChangesView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string
    })
  })
}

class ChangeView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <TopMenu index={this.props.match.params.index} />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <CChange
                index={this.props.match.params.index}
                changeIds={this.props.match.params.change}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

ChangeView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string,
      change: PropTypes.string
    })
  })
}

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={TopView} />
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/user' component={CUserView} />
        <Route exact path='/:index' component={RootView} />
        <Route path='/:index/merged-changes' component={MergedChangesView} />
        <Route path='/:index/opened-changes' component={OpenChangesView} />
        <Route path='/:index/abandoned-changes' component={AbandonedChangesView} />
        <Route path='/:index/change/:change' component={ChangeView} />
      </Switch>
    )
  }
}

export default App
