import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import type { Company } from '../../types';
import { apiGet, apiPost } from '../../api/axiosInterceptor';

interface CompanyFormValues {
    companyName: string;
    websiteUrl: string;
    email: string;
    phone: string;
    companyInfo: string;
}

const AddEditCompany = () => {
    const navigate = useNavigate();

    const fetchCompanies = async (): Promise<Company[]> => {
        const response = await apiGet(`/company/list`);
        if (response && typeof response === 'object' && 'data' in response) {
            return response.data as Company[];
        }
        return [];
    };

    const validationSchema = Yup.object({
        companyName: Yup.string().required('Company name is required'),
        websiteUrl: Yup.string().url('Enter a valid URL').required('Website is required'),
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required').min(10, 'Phone number min 10 character').max(15, 'Phone number max 15 characters'),
        companyInfo: Yup.string(),
    });

    const handleSubmit = async (
        values: CompanyFormValues,
        { setSubmitting, resetForm }: FormikHelpers<CompanyFormValues>,
    ) => {
        try {
            const response: any = await apiPost('/company/create', values);
            if (response && typeof response !== 'string' && response.statusCode === 200) {
                toast.success(`${response.message}`, { toastId: 'nodata', autoClose: 2000 });
                resetForm();
                fetchCompanies();
                setSubmitting(false);
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error adding company");
            setSubmitting(false);
        }
    }

    return (
        <div className="company-add-edit-container">
            <div className='back-btn'>
                <button onClick={() => navigate(-1)} className="company-add-btn">
                    Back
                </button>
            </div>
            <div className="company-form-container">
                <Formik
                    initialValues={{ companyName: '', websiteUrl: '', email: '', phone: '', companyInfo: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="company-form">
                            <h2 className="company-form-title">Add Company</h2>
                            <div className="company-form-group">
                                <label htmlFor="name">
                                    Company Name <span className="required-asterisk">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="companyName"
                                    id="name"
                                    className="company-form-input"
                                />
                                <ErrorMessage name="companyName" component="div" className="company-form-error" />
                            </div>
                            <div className="company-form-group">
                                <label htmlFor="website">
                                    Website <span className="required-asterisk">*</span>
                                </label>
                                <Field
                                    type="url"
                                    name="websiteUrl"
                                    id="website"
                                    className="company-form-input"
                                />
                                <ErrorMessage name="websiteUrl" component="div" className="company-form-error" />
                            </div>
                            <div className="company-form-group">
                                <label htmlFor="email">
                                    Email <span className="required-asterisk">*</span>
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="company-form-input"
                                />
                                <ErrorMessage name="email" component="div" className="company-form-error" />
                            </div>
                            <div className="company-form-group">
                                <label htmlFor="phone">
                                    Phone <span className="required-asterisk">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="company-form-input"
                                />
                                <ErrorMessage name="phone" component="div" className="company-form-error" />
                            </div>
                            <div className="company-form-group">
                                <label htmlFor="companyInfo">
                                    Company Info.
                                </label>
                                <Field
                                    as='textarea'
                                    type="text"
                                    name="companyInfo"
                                    id="companyInfo"
                                    className="company-form-input"
                                />
                            </div>
                            <button type="submit" className="company-form-btn" disabled={isSubmitting}>
                                Add
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddEditCompany;