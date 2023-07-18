import img1 from '../../../assets/img/1.jpg'
import img2 from '../../../assets/img/2.jpg'

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus varius massa sed consequat. Nullam
                ultrices elit at ligula feugiat consectetur. Integer condimentum ligula eget tristique fermentum.
            </p>
            <p className="mb-6">
                Curabitur volutpat a ex id mattis. Quisque fringilla est in odio fermentum gravida. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
            <p className="mb-6">
                Vestibulum feugiat elementum dignissim. Morbi auctor ipsum ac nibh faucibus, id fringilla lorem efficitur. Sed
                sollicitudin mi sed nulla mattis consequat.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <img className="w-32 h-32 rounded-full mx-auto mb-4" src={img2} alt="Team Member" />
                    <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                    <p className="text-gray-600">CEO</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <img className="w-32 h-32 rounded-full mx-auto mb-4" src={img1} alt="Team Member" />
                    <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                    <p className="text-gray-600">CTO</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <img className="w-32 h-32 rounded-full mx-auto mb-4" src={img2} alt="Team Member" />
                    <h3 className="text-xl font-semibold mb-2">Mike Johnson</h3>
                    <p className="text-gray-600">Lead Developer</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

