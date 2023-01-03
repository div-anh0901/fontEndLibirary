import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import AccountGeneral from 'src/sections/@dashboard/user/account/AccountGeneral';
import AccountNotifications from 'src/sections/@dashboard/user/account/AccountNotifications';
import AccountSocialLinks from 'src/sections/@dashboard/user/account/AccountSocialLinks';
import AccountBilling from 'src/sections/@dashboard/user/account/billing/AccountBilling';
import BorrowBook from 'src/sections/@dashboard/user/account/borrowBook/BorrowBook';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock/arrays';

export default function AccountPage() {
  const  {email} = useParams();
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: <Iconify icon="ic:round-receipt" />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={_userAddressBook}
          invoices={_userInvoices}
        />
      ),
    },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: <Iconify icon="eva:bell-fill" />,
      component: <AccountNotifications/>,
    },
    {
      value: 'brrowBook',
      label: 'BrrowBook',
      icon: <Iconify icon="ic:round-receipt" />,
      component: <BorrowBook />,
    },
  ];
  return (
    <>
      <Helmet>
        <title> User: Account Settings | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  )
}
