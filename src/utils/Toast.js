import toast, { Toaster } from 'react-hot-toast';

const Toast = () => {
	return (
		<div>
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						fontFamily: 'Poppins',
						fontSize: '14px',
						fontWeight: 400,
						letterSpacing: '1px',
					},
					duration: 4000,
				}}
			/>
		</div>
	);
};

export { Toast,toast };