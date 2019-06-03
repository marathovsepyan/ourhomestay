import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import {MainLayout}         from '../../imports/ui/layouts/MainLayout.jsx';
import {AuthLayout}         from '../../imports/ui/layouts/AuthLayout.jsx';
import {ErrorLayout}        from '../../imports/ui/layouts/ErrorLayout.jsx';
import {ProfileLayout}      from '../../imports/ui/layouts/ProfileLayout.jsx';
import {AccountLayout}      from '../../imports/ui/layouts/AccountLayout.jsx';
import {DashboardLayout}    from '../../imports/ui/layouts/DashboardLayout.jsx';
import AddUser              from '../../imports/ui/pages/admin/AddUser.jsx';
import Settings             from '../../imports/ui/pages/admin/Settings.jsx';
import ListStudents         from '../../imports/ui/pages/admin/ListStudents.jsx';
import ListAgencies         from '../../imports/ui/pages/admin/ListAgency.jsx';
import ListHomestays        from '../../imports/ui/pages/admin/ListHomestay.jsx';

// import HomestayList from '../../imports/ui/pages/admin/HomestayList.jsx';

import ListUniversities     from '../../imports/ui/pages/admin/ListUniversities.jsx';
import CreateHomestay       from '../../imports/ui/pages/CreateHomestay.jsx';
import UpdateHomestay       from '../../imports/ui/pages/UpdateHomestay.jsx';
import AccountSettings      from '../../imports/ui/pages/AccountSettings.jsx';
import CreateResidence      from '../../imports/ui/pages/CreateResidence.jsx';
import UpdateResidence      from '../../imports/ui/pages/UpdateResidence.jsx';
import HomestayProfile      from '../../imports/ui/pages/HomestayProfile.jsx';
import Login                from '../../imports/ui/pages/Login.jsx';
import ForgotPassword       from '../../imports/ui/pages/ForgotPassword.jsx';
import ResetPassword       from '../../imports/ui/pages/ResetPassword.jsx';
import Signup               from '../../imports/ui/pages/Signup.jsx';
import HomePage             from '../../imports/ui/pages/HomePage.jsx';
import UserProfile          from '../../imports/ui/pages/UserProfile.jsx';
import UniversityProfile    from '../../imports/ui/pages/UniversityProfile.jsx';
import SearchResult         from '../../imports/ui/pages/SearchResult.jsx';
import BookRoom             from '../../imports/ui/pages/BookRoom.jsx';
import PaymentPage          from '../../imports/ui/pages/PaymentPage.jsx';
import ThankYouPage         from '../../imports/ui/pages/ThankYou.jsx';
import ConfirmBooking       from '../../imports/ui/pages/ConfirmBooking.jsx';
import ListOrders           from '../../imports/ui/pages/ListOrder.jsx';
import AccountOrders        from '../../imports/ui/pages/account/AccountOrders.jsx';
import ListTransactions     from '../../imports/ui/pages/account/ListTransactions.jsx';
import AccountForm          from '../../imports/ui/pages/Account.jsx';
import AboutUs              from '../../imports/ui/pages/AboutUs.jsx';
import MoreDetails              from '../../imports/ui/pages/MoreDetails.jsx';


var publicRouter = FlowRouter.group({
  name: 'public',
  triggersEnter: [()=>{console.log('Running on a public page, Yo!');}]
});

var privateRouter = FlowRouter.group({
    name: 'private',
    triggersEnter: [function(context, redirect){
        if(Meteor.isClient){
            if(!Meteor.userId()){
                redirect('/login');
            }
        }
    }]
});

var adminRoutes = FlowRouter.group({
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    if(Meteor.isClient){
        if(!Meteor.userId()){
            redirect('/login');
        }
    }
  }]
});

publicRouter.route('/error/:code', {
    action(params) {
        mount(ErrorLayout, {
            content : 'Oops!. Page Not Found'
        });
    }
});

publicRouter.route('/noaccess', {
    name: 'noaccess',
    action(params) {
        mount(ErrorLayout, {
            content : 'You are not authorised to access this page'
        });
    }
});
publicRouter.route('/login', {
    name: 'login',
    action() {
        mount(AuthLayout, {
            content: <Login />
        });
    }
});

publicRouter.route('/forgot-password', {
    name: 'forgotPassword',
    action() {
        mount(AuthLayout, {
            content: <ForgotPassword />
        });
    }
});

publicRouter.route('/reset-password/:_resetPasswordToken', {
    name: 'resetPassword',
    action() {
        mount(AuthLayout, {
            content: <ResetPassword />
        });
    }
});

publicRouter.route('/register', {
    name: 'register',
    action() {
        mount(AuthLayout, {
            content: <Signup />
        });
    }
});
 
publicRouter.route('/', {
    name: 'home',
    action() {
        mount(MainLayout, {
            content: <HomePage />
        });
    }
});
publicRouter.route('/search', {
    name: 'search',
    action() {
        mount(MainLayout, {
            content: <SearchResult />
        });
    }
});

adminRoutes.route('/admin/students', {
    name            : 'admin-listStudents',
    action() {
        mount(MainLayout, {
            content: <ListStudents />
        });
    }
});

adminRoutes.route('/admin/agency', {
    name            : 'admin-listAgency',
    action() {
        mount(MainLayout, {
            content: <ListAgencies />
        });
    }
});

adminRoutes.route('/admin/homestays', {
    name            : 'admin-listHomestay',
    action() {
        mount(MainLayout, {
            content: <ListHomestays />
        });
    }
});

adminRoutes.route('/admin/universityResidence', {
    name            : 'admin-listUniversity',
    action() {
        mount(MainLayout, {
            content: <ListUniversities />
        });
    }
});

adminRoutes.route('/admin/createuser', {
    name: 'admin-adduser',
    action() {
        mount(MainLayout, {
            content: <AddUser />
        });
    }
});

adminRoutes.route('/admin/settings', {
    name: 'admin-settings',
    action() {
        mount(MainLayout, {
            content: <Settings />
        });
    }
});

adminRoutes.route('/admin/createHomestay', {
        name: 'admin-createHomestay',
        action() {
            mount(MainLayout, {
                content: <CreateHomestay />
            });
        }
});
adminRoutes.route('/admin/manageHomestay', {
        name: 'admin-manageHomestay',
        action() {
            mount(MainLayout, {
                content: <UpdateHomestay />
            });
        }
});

adminRoutes.route('/admin/createResidence', {
        name: 'admin-createResidence',
        action() {
            mount(MainLayout, {
                content: <CreateResidence />
            });
        }
});

adminRoutes.route('/admin/manageResidence', {
        name: 'admin-manageResidence',
        action() {
            mount(MainLayout, {
                content: <UpdateResidence />
            });
        }
});

privateRouter.route('/homestay', {
    name: 'homestay',
    action() {
        if (Meteor.user().profile.homestayId) {
            mount(MainLayout, {
                content: <UpdateHomestay />
            });
        } else {
            mount(MainLayout, {
                content: <CreateHomestay />
            });
        }
    }
});

privateRouter.route('/accountSettings', {
    name: 'accountSettings',
    action() {
        if (Meteor.user()) {
            mount(MainLayout, {
                content: <AccountSettings />
            });
        }
    }
});

privateRouter.route('/universityresidence', {
    name: 'universityresidence',
    action() {
        if (Meteor.user().profile.homestayId) {
            mount(MainLayout, {
                content: <UpdateResidence />
            });
        } else {
            mount(MainLayout, {
                content: <CreateResidence />
            });
        }
    }
});
privateRouter.route('/bookroom/:bookingId', {
    name: 'book-room',
    action() {
        mount(ProfileLayout, {
            content: <BookRoom />
        });
    }
});

privateRouter.route('/confirmbooking/:bookingId', {
    name: 'book-room',
    action() {
        mount(ProfileLayout, {
            content: <ConfirmBooking />
        });
    }
});
privateRouter.route('/payment/:bookingId', {
    name: 'book-room',
    action() {
        mount(ProfileLayout, {
            content: <PaymentPage />
        });
    }
});

privateRouter.route('/bookingcompleted', {
    name: 'booking-completed',
    action() {
        mount(ProfileLayout, {
            content: <ThankYouPage />
        });
    }
});
publicRouter.route('/homestay/:homestayId', {
    name: 'homestay-profile',
    action() {
            mount(MainLayout, {
                content: <HomestayProfile />
            });
    }
});
privateRouter.route('/account', {
    name: 'homestay-account',
    action() {
        mount(MainLayout, {
            content: <AccountForm />
        });
    }
});
/*privateRouter.route('/universityresidence/account', {
    name: 'universityresidence-account',
    action() {
        mount(ProfileLayout, {
            content: <AccountForm />
        });
    }
});*/
privateRouter.route('/agency/profile', {
    name: 'agency-profile',
    action() {
        mount(ProfileLayout, {
            content: <UserProfile />
        });
    }
});
privateRouter.route('/student/profile', {
    name: 'student-profile',
    action() {
        mount(ProfileLayout, {
            content: <UserProfile />
        });
    }
});


privateRouter.route('/universityResidence', {
    name: 'universityResidence',
    action() {
        mount(MainLayout, {
            content: <UniversityProfile />
        });
    }
});

privateRouter.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout(function(err) {
            redirect('/')
        })
    }
});

publicRouter.route('/orders', {
    name            : 'list-order',
    action() {
        mount(DashboardLayout, {
            content: <ListOrders />
        });
    }
});

publicRouter.route('/account/orders', {
    name            : 'account-order',
    action() {
        mount(AccountLayout, {
            content: <AccountOrders />
        });
    }
});

publicRouter.route('/account/transactions', {
    name            : 'account-transactions',
    action() {
        mount(AccountLayout, {
            content: <ListTransactions />
        });
    }
});

publicRouter.route('/aboutus', {
    name: 'about-us',
    action() {
        mount(AuthLayout, {
            content: <AboutUs />
        });
    }
});

publicRouter.route('/moredetails', {
    name: 'more-details',
    action() {
        mount(AuthLayout, {
            content: <MoreDetails />
        });
    }
});

FlowRouter.notFound = {
    action: function() {
        //console.log('Not Found yo!');
        FlowRouter.go('/error/404');
    }
};

