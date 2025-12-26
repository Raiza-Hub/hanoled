import UserProfile from "@/components/setting/profile/user-profile";


const ProfilePage = () => {
    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col p-6">
            <div className="flex flex-col border-b pb-6 mb-6">
                <h2 className="font-semibold">Profile</h2>
                <p className="text-sm">Manage settings for your Hanoled.com profile</p>
            </div>
            <div>
                <UserProfile />
            </div>
        </div>
    );
}

export default ProfilePage;