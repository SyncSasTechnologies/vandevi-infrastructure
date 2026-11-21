import residentialProjectsImg from '../../../assets/images/residential_projects.png';
import commercialProjectsImg from '../../../assets/images/commercial_projects.png';
import masterBedroomsImg from '../../../assets/images/master_bedrooms.png';
import livingRoomsImg from '../../../assets/images/living_rooms.png';
import washroomsImg from '../../../assets/images/washrooms.png';
import officeInteriorsImg from '../../../assets/images/office_interiors.png';

export interface FeaturedWorkItem {
  id: string;
  title: string;
  image: string;
}

export interface FeaturedProjectsPanelData {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  calloutHeadingPrefix: string;
  calloutHeadingHighlight: string;
  calloutDescription: string;
  viewAllCta: {
    label: string;
    link: string;
  };
  contactCta: {
    label: string;
    link: string;
  };
  works: FeaturedWorkItem[];
}

export const FEATURED_PROJECTS_DATA: FeaturedProjectsPanelData = {
  titlePrefix: 'Our ',
  titleHighlight: 'Selected Works',
  description:
    'Explore our collection of residential and commercial interior design concepts.',
  calloutHeadingPrefix: 'Have a Project in Mind?',
  calloutHeadingHighlight: "Let's Discuss It.",
  calloutDescription:
    'Turn your ideas into beautifully designed spaces with Vandevi Infrastructure.',
  viewAllCta: {
    label: 'View All Projects',
    link: '/projects'
  },
  contactCta: {
    label: 'Get in Touch',
    link: '/contact'
  },
  works: [
    {
      id: 'work-1',
      title: 'Residential Projects',
      image: residentialProjectsImg
    },
    {
      id: 'work-2',
      title: 'Commercial Projects',
      image: commercialProjectsImg
    },
    {
      id: 'work-3',
      title: 'Master Bedrooms',
      image: masterBedroomsImg
    },
    {
      id: 'work-4',
      title: 'Living Rooms',
      image: livingRoomsImg
    },
    {
      id: 'work-5',
      title: 'Washrooms',
      image: washroomsImg
    },
    {
      id: 'work-6',
      title: 'Office Interiors',
      image: officeInteriorsImg
    }
  ]
};
