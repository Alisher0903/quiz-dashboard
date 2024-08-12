import React from 'react'

const ClientProfileEdit = () => {
    return (
        <div className="container mx-auto px-4 mt-4">
            {/* Account page navigation */}
            <nav className="flex border-b-2 border-gray-300">
                <a
                    className="text-blue-600 border-b-2 border-blue-600 py-2 px-4"
                    href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Profile
                </a>
                <a
                    className="text-gray-600 py-2 px-4"
                    href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Billing
                </a>
                <a
                    className="text-gray-600 py-2 px-4"
                    href="https://www.bootdey.com/snippets/view/bs5-profile-security-page"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Security
                </a>
                <a
                    className="text-gray-600 py-2 px-4"
                    href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Notifications
                </a>
            </nav>
            <hr className="mt-4 mb-4" />

            <div className="flex flex-wrap">
                {/* Profile picture card */}
                <div className="w-full xl:w-1/3 mb-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-medium mb-4">Profile Picture</h2>
                        <div className="text-center">
                            <img
                                className="rounded-full h-40 w-40 mx-auto mb-4"
                                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                                alt=""
                            />
                            <div className="text-gray-500 text-sm mb-4">
                                JPG or PNG no larger than 5 MB
                            </div>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded">
                                Upload new image
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account details card */}
                <div className="w-full xl:w-2/3">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-medium mb-4">Account Details</h2>
                        <form>
                            {/* Form Group (username) */}
                            <div className="mb-4">
                                <label className="text-sm mb-1 block" htmlFor="inputUsername">
                                    Username (how your name will appear to other users on the site)
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded"
                                    id="inputUsername"
                                    type="text"
                                    placeholder="Enter your username"
                                    value="username"
                                />
                            </div>
                            {/* Form Row */}
                            <div className="flex flex-wrap -mx-2">
                                {/* Form Group (first name) */}
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputFirstName">
                                        First name
                                    </label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputFirstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        value="Valerie"
                                    />
                                </div>
                                {/* Form Group (last name) */}
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputLastName">
                                        Last name
                                    </label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputLastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        value="Luna"
                                    />
                                </div>
                            </div>
                            {/* Form Row */}
                            <div className="flex flex-wrap -mx-2 mb-4">
                                {/* Form Group (organization name) */}
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputOrgName">
                                        Organization name
                                    </label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputOrgName"
                                        type="text"
                                        placeholder="Enter your organization name"
                                        value="Start Bootstrap"
                                    />
                                </div>
                                {/* Form Group (location) */}
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputLocation">
                                        Location
                                    </label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputLocation"
                                        type="text"
                                        placeholder="Enter your location"
                                        value="San Francisco, CA"
                                    />
                                </div>
                            </div>
                            {/* Form Group (email address) */}
                            <div className="mb-4">
                                <label className="text-sm mb-1 block" htmlFor="inputEmailAddress">
                                    Email address
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded"
                                    id="inputEmailAddress"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value="name@example.com"
                                />
                            </div>
                            {/* Form Row */}
                            <div className="flex flex-wrap -mx-2 mb-4">
                                {/* Form Group (phone number) */}
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputPhone">
                                        Phone number
                                    </label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputPhone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value="555-123-4567"
                                    />
                                </div>
                                {/* Form Group (birthday) */}
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputBirthday">
                                        Birthday
                                    </label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputBirthday"
                                        type="text"
                                        name="birthday"
                                        placeholder="Enter your birthday"
                                        value="06/10/1988"
                                    />
                                </div>
                            </div>
                            {/* Save changes button */}
                            <button className="bg-blue-600 text-white py-2 px-4 rounded" type="button">
                                Save changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ClientProfileEdit