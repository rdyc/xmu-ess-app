// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   TextField,
//   Typography,
// } from '@material-ui/core';
// import { isWidthDown } from '@material-ui/core/withWidth';
// import BusinessIcon from '@material-ui/icons/Business';
// import SearchIcon from '@material-ui/icons/Search';
// import * as React from 'react';
// import { FormattedMessage } from 'react-intl';
// import { List as VirtualizedList, ListRowProps } from 'react-virtualized';

// import { ProjectDialogProps } from './ProjectDialog';

// export const ProjectDialogView: React.SFC<ProjectDialogProps> = props => {
//   const { isOpen, _search } = props;
//   const { width, intl } = props;
//   const { onSelected, onClose, filterProjects, searchOnChange, searchOnKeyUp } = props;
//   const { response } = props.projectRegisterState.list;

//   const isMobile = isWidthDown('sm', width);
//   const projects = filterProjects(response);

//   const rowRenderer = (row: ListRowProps) => {
//     if (projects.length > 0) {
//       const project = projects[row.index];

//       if (!project) {
//         return;
//       }

//       return (
//         <ListItem 
//           button 
//           key={row.index}
//           style={{...row.style}}
//           onClick={() => onSelected(project)}
//         >
//           <ListItemAvatar>
//             <Avatar>
//               <BusinessIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText 
//             color="primary"
//             primary={project.name}
//             secondary={project.uid}
//             primaryTypographyProps={{
//               noWrap: true
//             }}
//             secondaryTypographyProps={{
//               noWrap: true
//             }}
//           />
//         </ListItem>
//       );
//     }

//     return null;
//   };

//   const render = (
//     <Dialog 
//       fullScreen={isMobile}
//       open={isOpen}
//       aria-labelledby="project-dialog-title" 
//       onClose={onClose}
//     >
//       <DialogTitle 
//         id="project-dialog-title"
//         disableTypography
//       >
//         <Typography variant="title" color="primary">
//           <FormattedMessage id="project.title" />
//         </Typography>

//         <Typography variant="subheading">
//           <FormattedMessage id="project.subtitle" />
//         </Typography>
        
//         <TextField
//           id="project-selector-text"
//           fullWidth
//           margin="normal"
//           value={_search}
//           disabled={!response}
//           label={<FormattedMessage id="global.search" />}
//           placeholder={intl.formatMessage({ id: 'project.placeholder.Search' })}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           onChange={searchOnChange}
//           onKeyUp={searchOnKeyUp}
//         />
//       </DialogTitle>
//       <DialogContent 
//         style={{ 
//           padding: 0 
//         }}
//       >
//         <List>
//           <VirtualizedList
//             width={600}
//             height={550}
//             // autoWidth
//             // autoHeight
//             rowCount={projects.length}
//             rowHeight={60}
//             rowRenderer={rowRenderer}
//           />
//         </List>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => onClose()} color="secondary">
//           <FormattedMessage id="global.action.discard" />
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return render;
// };