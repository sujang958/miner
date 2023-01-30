const SupportedProtocolVersions = {
  '1.19.3': 761,
};

export type SupportedProtocolVersionsKey = keyof typeof SupportedProtocolVersions;

export const isSupportedVersion = (version: string): version is SupportedProtocolVersionsKey => {
  if (version in SupportedProtocolVersions) return true;
  else return false;
};

export default SupportedProtocolVersions;
