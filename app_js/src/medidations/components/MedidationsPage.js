import React from 'react';
import {Route, Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import Sidebar from 'lego/lib/Sidebar';
import SidebarLayout from 'lego/lib/SidebarLayout';
import PageHeader from 'lego/lib/PageHeader';

import MedidationsListContainer from '../containers/MedidationsListContainer';
import MedidationDetailContainer from '../containers/MedidationDetailContainer';
import NewMedidationPage from '../containers/NewMedidationPage';

export default class MedidationsPage extends React.Component {
  renderSidebar () {
    return <Sidebar>
      <li className='active'>
        <Link to="/">
          <span className='item-name'>
            <FormattedMessage id='medidations.sidebar' defaultMessage='Medidations' />
          </span>
        </Link>
      </li>
    </Sidebar>;
  }

  render () {
    return <SidebarLayout sidebar={this.renderSidebar()}>
      <PageHeader
        heading={<FormattedMessage id='medidations.page.header' defaultMessage='Medidations' />}
        controls={<Link to='/medidations/create' className='btn btn-default' ><FormattedMessage id='medidations.page.addMedidation' defaultMessage='Add Medidation' /></Link>}
        />
      <Route exact path='/medidations' component={MedidationsListContainer} />
      <Route exact path='/medidations/create' component={NewMedidationPage} />
      <Route path='/medidations/:medidationId' component={MedidationDetailContainer} />
    </SidebarLayout>;
  }
}

MedidationsPage.propTypes = {
};
