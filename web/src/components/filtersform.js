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

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropDownButton from 'react-bootstrap/DropdownButton'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class DateFormBox extends React.Component {
  getDateString = (count, unit) => {
    return moment().subtract(count, unit)
      .format('YYYY-MM-DD')
  }

  handleClick = (e) => {
    switch (e.target.attributes.value.value) {
      case '1-week':
        this.props.handleChange(
          'gte', this.getDateString(7, 'days'))
        this.props.handleChange('lte', '')
        break
      case '2-weeks':
        this.props.handleChange(
          'gte', this.getDateString(14, 'days'))
        this.props.handleChange('lte', '')
        break
      case '1-month':
        this.props.handleChange(
          'gte', this.getDateString(1, 'months'))
        this.props.handleChange('lte', '')
        break
      case '3-months':
        this.props.handleChange(
          'gte', this.getDateString(3, 'months'))
        this.props.handleChange('lte', '')
        break
      case '6-months':
        this.props.handleChange(
          'gte', this.getDateString(6, 'months'))
        this.props.handleChange('lte', '')
        break
      default:
        break
    }
  }

  render () {
    return (
      <React.Fragment>
        <Col>
          <Form.Group controlId='formFromDate'>
            <DatePicker
              selected={
                this.props.gte
                  ? moment(this.props.gte).toDate() : ''}
              onChange={v => this.props.handleChange('gte', v)}
              dateFormat='yyyy-MM-dd'
              placeholderText='From date'
              showYearDropdown
            />
          </Form.Group>
          <Form.Group controlId='formToDate'>
            <DatePicker
              selected={
                this.props.lte
                  ? moment(this.props.lte).toDate() : ''}
              onChange={v => this.props.handleChange('lte', v)}
              dateFormat='yyyy-MM-dd'
              placeholderText='To date'
              showYearDropdown
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='formToDate'>
            <DropDownButton
              title="Relative date"
              size="sm"
              variant="secondary"
            >
              {[
                ['1-week', '1 week'],
                ['2-weeks', '2 weeks'],
                ['1-month', '1 month'],
                ['3-months', '3 months'],
                ['6-months', '6 months']].map(
                (entry) => {
                  return <Dropdown.Item
                    key={entry[0]}
                    value={entry[0]}
                    onClick={this.handleClick}
                  >
                    {entry[1]}
                  </Dropdown.Item>
                }
              )
              }
            </DropDownButton>
          </Form.Group>
        </Col>
      </React.Fragment>
    )
  }
}

DateFormBox.propTypes = {
  gte: PropTypes.string.isRequired,
  lte: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

class FiltersForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gte: '',
      lte: '',
      repository: '',
      branch: '',
      files: '',
      exclude_authors: '',
      authors: ''
    }
    if (this.props.history !== undefined) {
      this.props.history.listen((location, action) => {
        if (this.mounted) {
          this.fetchQueryParams()
        }
      })
    }
  }

  componentDidMount () {
    this.mounted = true
    this.fetchQueryParams()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  handleChange = (key, e) => {
    let val = (e && e.target) ? e.target.value : e
    const assoc = {}
    if (key === 'gte' || key === 'lte') {
      val = moment(val).format('YYYY-MM-DD')
      if (val === 'Invalid date') {
        val = ''
      }
    } else if (!e) {
      val = ''
    }
    assoc[key] = val
    this.setState(assoc)
  }

  fetchQueryParams = () => {
    const params = new URLSearchParams(this.props.history.location.search)
    this.setState({
      lte: params.get('lte') || '',
      gte: params.get('gte') || moment().subtract(3, 'months')
        .format('YYYY-MM-DD'),
      repository: params.get('repository') || '',
      branch: params.get('branch') || '',
      files: params.get('files') || '',
      excludeAuthors: params.get('exclude_authors') || '',
      authors: params.get('authors') || ''
    })
  }

  updateHistoryURL = (params) => {
    const urlparams = new URLSearchParams(this.props.history.location.search)
    Object.keys(params).forEach(element => {
      if (params[element]) {
        urlparams.set(element, params[element])
      } else {
        urlparams.delete(element)
      }
    })
    if (this.props.history.location.search !== '?' + urlparams.toString()) {
      const newsearch = this.props.history.location.pathname + '?' + urlparams.toString()
      this.props.history.push(newsearch)
    }
  }

  handleSubmit = (event) => {
    this.updateHistoryURL({
      gte: this.state.gte,
      lte: this.state.lte,
      repository: this.state.repository,
      branch: this.state.branch,
      files: this.state.files,
      exclude_authors: this.state.exclude_authors,
      authors: this.state.authors
    })
    event.preventDefault()
  }

  render () {
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Card.Header>
            <Row>
              <Col>
                <b>Filters</b>
              </Col>
              <Col>
                <Button
                  className='float-right'
                  variant='primary'
                  type='submit'
                  size='sm'
                >
                  Apply filters
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <DateFormBox
                gte={this.state.gte}
                lte={this.state.lte}
                handleChange={this.handleChange}
              />
              <Col>
                <Form.Group controlId='formAuthorsInput'>
                  <Form.Control
                    type='text'
                    value={this.state.authors}
                    placeholder="Authors"
                    onChange={v => this.handleChange('authors', v)}
                  />
                </Form.Group>
                <Form.Group controlId='formExcludeAuthorsInput'>
                  <Form.Control
                    type='text'
                    value={this.state.exclude_authors}
                    placeholder="Exclude Authors"
                    onChange={v => this.handleChange('exclude_authors', v)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formRepositoryInput'>
                  <Form.Control
                    type='text'
                    value={this.state.repository}
                    placeholder="Repositories regexp"
                    onChange={v => this.handleChange('repository', v)}
                  />
                </Form.Group>
                <Form.Group controlId='formBranchInput'>
                  <Form.Control
                    type='text'
                    value={this.state.branch}
                    placeholder="Branch regexp"
                    onChange={v => this.handleChange('branch', v)}
                  />
                </Form.Group>
                <Form.Group controlId='formFilesInput'>
                  <Form.Control
                    type='text'
                    value={this.state.files}
                    placeholder="Files regexp"
                    onChange={v => this.handleChange('files', v)}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          </Card.Body>
        </Form>
      </Card >
    )
  }
}

FiltersForm.propTypes = {
  history: PropTypes.object.isRequired
}

const CFiltersForm = withRouter(FiltersForm)

export {
  CFiltersForm
}
