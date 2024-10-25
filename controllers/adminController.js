

//Add doctor//

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, specialty, degree, experience, about, fees, address } = req.body;

        res.status(201).json({ message: 'Doctor added!' });
    } catch (error) {
        console.error(error); //log error 
        res.status(500).json({ message: 'Server Error' });
    }
};

export {addDoctor}