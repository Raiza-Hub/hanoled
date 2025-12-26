import NotificationsSettings from "@/components/setting/notification/notification-settings";



const SchoolPage = () => {
    return ( 
        <div className="w-full max-w-2xl mx-auto flex flex-col p-6">
            <div className="flex flex-col border-b pb-6 mb-6">
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-sm">Manage how and when you receive notifications, including alerts about activities, announcements, and account changes.</p>
            </div>
            <div>
                <NotificationsSettings />
            </div>
        </div>
     );
}
 
export default SchoolPage;