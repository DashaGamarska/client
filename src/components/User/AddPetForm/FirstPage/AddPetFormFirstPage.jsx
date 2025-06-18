import { AddPetInput } from '../AddPetInput/AddPetInput';
import {
	getPetNameUser,
	getPetBirthUser,
	getPetBreedUser,
} from 'components/Authorization/Input/inputOptions';

export const AddPetFormFirstPage = ({ register, errors, dict }) => {
	
	return (

		<>
			<AddPetInput
				register={register}
				errors={errors}
				settings={getPetNameUser(dict)}
			/>
			<AddPetInput
				register={register}
				errors={errors}
				settings={getPetBirthUser(dict)}
			/>
			<AddPetInput
				register={register}
				errors={errors}
				settings={getPetBreedUser(dict)}
			/>
		</>
	);
};
